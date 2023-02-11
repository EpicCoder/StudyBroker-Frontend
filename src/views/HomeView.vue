<script setup>
import OverviewChart from "../components/OverviewChart.vue";
import ModalInfo from "../components/ModalInfo.vue";
</script>

<template>
  <ModalInfo ref="modal">
    <p>{{ transactionMessage }}</p>
  </ModalInfo>
  <div class="container text-white mt-5">
    <div class="row gap-5 mb-5 gx-0">
      <div class="col">
        <h5>Depowert:</h5>
        <h3 :class="textClass(totalStockValue)">
          {{ totalStockValueInEUR }}
        </h3>
      </div>
      <div class="col">
        <h5>Kaufwert:</h5>
        <h3 :class="textClass(totalPurchaseValue)">
          {{ valueInEUR(totalPurchaseValue) }}
        </h3>
      </div>
      <div class="col">
        <h5>Guthaben (Spielgeld):</h5>
        <h3 :class="textClass(balance)">{{ valueInEUR(balance) }}</h3>
      </div>
    </div>

    <div v-if="stocks" class="row gap-5 mb-5 gx-0">
      <div class="col">
        <OverviewChart :data="charData" />
      </div>
    </div>

    <div v-if="stocks" class="row gap-5 gx-0">
      <table class="table text-white">
        <thead>
          <tr>
            <th scope="col">Bezeichnung</th>
            <th scope="col">Anteile</th>
            <th scope="col">Kurs</th>
            <th scope="col">Wert</th>
            <th scope="col">Aktion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stocks" :key="stock.name">
            <td>{{ stock.name }}</td>
            <td>{{ stock.shares }}</td>
            <td>{{ valueInEUR(stock.price) }}</td>
            <td>{{ valueInEUR(stock.price * stock.shares) }}</td>
            <td>
              <button
                class="btn btn-success rounded-0 me-3"
                @click="buyStock(stock.name)"
              >
                Kaufen
              </button>
              <button
                class="btn btn-danger rounded-0"
                @click="sellStock(stock.name)"
              >
                Verkaufen
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="row gap-5 gx-0">
      <div class="col alert alert-warning text-center rounded-0">
        Dein Portfolio ist noch leer
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  border: 1px solid var(--bs-purple);
}

.table tbody {
  border-top-width: 2px;
}

.col {
  border: 1px solid var(--bs-purple);
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.col p:last-child {
  margin: 0;
}
</style>

<script>
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.js";

export default {
  data() {
    return {
      totalStockValue: 0,
      totalPurchaseValue: 0,
      balance: 0,
      transactionMessage: "",
      stocks: null,
      infoModal: null,
      charData: {
        labels: null,
        datasets: [
          {
            data: null,
            borderWidth: 0,
          },
        ],
      },
    };
  },
  methods: {
    textClass(number) {
      return number >= 0 ? "text-success" : "text-danger";
    },
    valueInEUR(value) {
      return value.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
      });
    },
    buyStock(name) {
      this.$http
        .post("/trade/buy", { name: name, shares: 1 })
        .then((response) => {
          this.updateOverview();
          if (response.status === 200) {
            this.transactionMessage = "Kauf war erfolgreich!";
            this.infoModal.show();
          }
        })
        .catch((error) => {
          this.transactionMessage = "Kauf war nicht erfolgreich!";
          this.infoModal.show();
          console.log("Failed to buy stock!");
        });
    },
    sellStock(name) {
      this.$http
        .post("/trade/sell", { name: name, shares: 1 })
        .then((response) => {
          this.updateOverview();
          if (response.status === 200) {
            this.transactionMessage = "Verkauf war erfolgreich!";
            this.infoModal.show();
          }
        })
        .catch((error) => {
          this.transactionMessage = "Verkauf war nicht erfolgreich!";
          this.infoModal.show();
          console.log("Failed to sell stock!");
        });
    },
    updateOverview() {
      this.$http
        .get("/trade/overview")
        .then((response) => {
          this.balance = response.data.balance;
          this.totalPurchaseValue = response.data.totalPurchase;
          this.stocks = response.data.trades;
          this.charData.labels = this.stocks.map((stock) => stock.name);
          this.charData.datasets[0].data = this.stocks.map(
            (stock) => stock.shares
          );
        })
        .catch((error) => {
          console.log("Failed to get overview from API!");
        });
    },
  },
  computed: {
    totalStockValueInEUR() {
      if (this.stocks) {
        this.totalStockValue = this.stocks.reduce((sum, stock) => {
          return sum + stock.price * stock.shares;
        }, 0);
      }
      return this.valueInEUR(this.totalStockValue);
    },
  },
  created() {
    this.updateOverview();
  },
  mounted() {
    this.infoModal = new Modal("#infoModal");
  },
};
</script>
