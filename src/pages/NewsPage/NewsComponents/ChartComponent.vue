<template>
  <!-- <p v-bind:textContent="stock.currentPrice"></p> -->
  <div v-if="loaded" class="chart">
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
  
<script>
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "ChartComponent",
  components: { Line },
  props: {
    symbol: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loaded: false,
      saved_symbol: "",
      chartData: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        datasets: [{ label: "close", backgroundColor: "#4BC0C0", data: [] }],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  watch: {
    symbol(newValue) {
      this.saved_symbol = newValue;
    },
  },
  async mounted() {
    this.loaded = false;
    this.saved_symbol = this.symbol;

    ajax(
      `https://query1.finance.yahoo.com/v8/finance/chart/${this.saved_symbol}?metrics=close?&interval=1d&range=5d`
    )
      .pipe(
        map(
          (response) =>
            response.response.chart.result[0].indicators.quote[0].high
        )
      )
      .subscribe((data) => {
        this.chartData.datasets[0].data = data;
        this.loaded = true;
      });
  },
};
</script>
<style>
.chart{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
canvas{
    width: 100%;
    height: auto;
}
</style>