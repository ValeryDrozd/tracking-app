<template>
    <!-- <p v-bind:textContent="stock.currentPrice"></p> -->
    <p>
      {{ text }}
    </p>
  </template>
    
  <script>
  import { ajax } from "rxjs/ajax";
  import { map, catchError} from "rxjs/operators";
  
  
  export default {
    name: "ChartComponent",
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
        text: ''
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
  
      const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(this.saved_symbol)}?modules=assetProfile`;


      const stock$ = ajax(url).pipe(
        map((res) => res.response),
        catchError((error) => {
          console.error(error);
          // eslint-disable-next-line no-undef
          return of(error);
        })
      );

      stock$.subscribe((data) => {
        this.loaded = true;
        this.text = data.quoteSummary.result[0].assetProfile.longBusinessSummary;
      });
    },
  };
  </script>
