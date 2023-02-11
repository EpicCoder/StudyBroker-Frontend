<template>
  <div class="container text-white mt-5">
    <table v-if="stocks" class="table text-white">
      <thead>
        <tr>
          <th scope="col">Datum</th>
          <th scope="col">Bezeichnung</th>
          <th scope="col">Anteile</th>
          <th scope="col">Betrag</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="stock in stocks"
          :key="stock.name"
          :class="rowClass(stock.shares)"
        >
          <td>{{ localeDate(stock.date) }}</td>
          <td>{{ stock.name }}</td>
          <td>{{ stock.shares }}</td>
          <td>{{ valueInEUR(stock.price) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="col alert alert-warning text-center rounded-0">
      Bisher noch keine Transaktionen!
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
</style>

<script>
export default {
  name: "TransactionsView",
  data() {
    return {
      stocks: null,
    };
  },
  methods: {
    rowClass(number) {
      return number >= 0 ? "bg-success" : "bg-danger";
    },
    valueInEUR(value) {
      return value.toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
      });
    },
    localeDate(date) {
      const options = {
        weekday: "short",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(date).toLocaleString("de-de", options);
    },
  },
  created() {
    this.$http
      .get("/trade/transactions")
      .then((response) => {
        this.stocks = response.data;
      })
      .catch((error) => {
        console.log("Failed to get trades from API!");
      });
  },
};
</script>
