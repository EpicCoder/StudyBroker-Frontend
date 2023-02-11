<template>
  <Doughnut
    ref="donut"
    :data="charData"
    :options="charOptions"
    style="max-height: 350px"
  />
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export default {
  name: "OverviewChart",
  components: {
    Doughnut,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    charData() {
      return this.data;
    },
    charOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
  },
};
</script>
