<script setup>
import LineChart from "../components/LineChart.vue";
import ModalInfo from "../components/ModalInfo.vue";
</script>

<template>
  <ModalInfo>
    <p>{{ transactionMessage }}</p>
  </ModalInfo>
  <div class="container text-white mt-5">
    <div class="row gap-5 mb-5 gx-0">
      <div class="col">
        <div class="input-group mb-3">
          <input @keydown.enter="searchStock()" type="text" v-model="searchValue" class="form-control rounded-0"
            placeholder="US-Wertpapier Symbol: AAPL, TSLA, MSFT..." />
          <div class="input-group-append">
            <button class="btn btn-primary rounded-0" type="button" @click="searchStock()">
              Suchen
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-for="result in searchData" class="row gap-5 mb-5 gx-0">
      <div class="col-4 border p-3 d-flex flex-column justify-content-between">
        <h5 class="text-center">{{ result.name }}</h5>
        <table class="table text-white">
          <tbody>
            <tr>
              <td>Preis:</td>
              <td class="text-end">{{ valueInEUR(result.price) }}</td>
            </tr>
            <tr>
              <td>Änderung in EUR:</td>
              <td class="text-end" :class="textClass(result.absChange)">
                {{ valueInEUR(result.absChange) }}
              </td>
            </tr>
            <tr>
              <td>Änderung in %:</td>
              <td class="text-end" :class="textClass(result.percentChange)">
                {{ result.percentChange.toFixed(2) }} %
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-success rounded-0 me-3 w-100" @click="buyStock(result.name)">
          Kaufen
        </button>
      </div>
      <div class="col border p-3">
        <LineChart :history="result.history" />
      </div>
    </div>
    <div v-if="error" class="alert alert-warning text-center rounded-0">
      Kein Ergebnis für das gesuchte Wertpapier! Möglicherweise liegt Ihre Anfrage außerhalb der Handelszeiten
      (Mo.–Fr.).
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.js";

export default {
  name: "ExchangeView",
  data() {
    return {
      searchValue: "",
      searchData: null,
      error: false,
      transactionMessage: "",
      infoModal: null,
    };
  },
  methods: {
    searchStock() {
      this.error = false;
      this.searchData = null;
      this.$http
        .get(`/exchange/find`, { params: { name: this.searchValue } })
        .then((response) => {
          this.searchData = response.data;
        })
        .catch((error) => {
          this.error = true;
          console.log("Error: Cant find stock");
        });
    },
    buyStock(name) {
      this.$http
        .post("/trade/buy", { name: name, shares: 1 })
        .then((response) => {
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
    valueInEUR(value) {
      return value.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
      });
    },
    textClass(number) {
      return number >= 0 ? "text-success" : "text-danger";
    },
  },
  mounted() {
    this.infoModal = new Modal("#infoModal");
  },
};
</script>

<style scoped>
.container {
  --bs-border-color: var(--bs-purple);
}

.btn-primary {
  --bs-btn-bg: var(--bs-purple);
  --bs-btn-border-color: var(--bs-purple);
  --bs-btn-hover-bg: var(--ba-link-active);
  --bs-btn-hover-border-color: var(--ba-link-active);
}
</style>
