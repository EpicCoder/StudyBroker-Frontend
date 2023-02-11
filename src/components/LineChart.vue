<template>
  <Line :options="charOptions" :data="chartData" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default {
  name: "LineChart",
  components: { Line },
  data() {
    return {
      chartData: {
        labels: null,
        datasets: [
          {
            data: null,
          },
        ],
      },
      charOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  props: {
    history: {
      required: true,
    },
  },
  created() {
    this.chartData.labels = this.history.timeinterval;
    this.chartData.datasets[0].data = this.history.data;
  },
};
</script>
