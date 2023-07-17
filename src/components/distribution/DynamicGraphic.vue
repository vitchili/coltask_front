<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { watchEffect, toRaw } from 'vue';

export default {
  name: 'DynamicGraphic',
  data(){
    return {
      tasksArray: []
    };
  },
  props: {
    tasks: {
      type: Array,
      required: false,
    },
  },
  mounted() {
    this.chartInstance = null;
    this.createChart();

    watchEffect(() => {
      const tasks = toRaw(this.tasks);
      // console.log(tasks);

      var tasksArray = [0,0,0,0,0,0,0,0,0,0,0,0];

      if(tasks){
        tasks.forEach(function(task, index){
          var date = new Date(task.created_at);
          tasksArray[date.getMonth()+1]++;
        });
      }

      this.tasksArray = tasksArray;

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.createChart();
    });
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chartCanvas;

      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [
            {
              label: 'Tarefas por mês',
              data: [
                this.tasksArray[1], 
                this.tasksArray[2], 
                this.tasksArray[3], 
                this.tasksArray[4], 
                this.tasksArray[5], 
                this.tasksArray[6], 
                this.tasksArray[7], 
                this.tasksArray[8], 
                this.tasksArray[9],
                this.tasksArray[10], 
                this.tasksArray[11], 
                this.tasksArray[12]], // Exemplo, substitua pelos dados corretos
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
        },
      });
    },
  },
};
</script>

<style scoped>

</style>
