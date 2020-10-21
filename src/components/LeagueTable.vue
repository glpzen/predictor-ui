<template>
    <div class="hello">
        <h1>predictor-ui</h1>
        <datatable :columns="columns" :data="rows"></datatable>
        <button v-if="week > 1" @click="fetchLeagueTable(week--)">Previous Week</button>
        <button v-if="week < 6" @click="fetchLeagueTable(week++)">Next Week</button>
        <ul class="predictions">
            <li v-for="coefficient in coefficients" :key="coefficient.key">
                {{coefficient.name}}: {{((coefficient.ratio / sample) * 100).toFixed(2)}}%
            </li>
        </ul>
    </div>
</template>

<style scoped>

    .predictions {
        position: absolute;
        left: 45vw;
        width: 10vw;
        text-align: initial;
    }

</style>

<script>
    export default {
        name: 'LeagueTable',
        data: function () {
            return {
                week: 1,
                columns: [
                    {label: 'id', field: 'id'},
                    {label: 'Team', field: 'team.name', headerClass: 'class-in-header second-class'},
                    {label: 'Opposing Team', field: 'opposing_team.name', headerClass: 'class-in-header second-class'},
                    // {label: 'Week', field: 'week', headerClass: 'class-in-header second-class'},
                    {label: 'Points', field: 'points', headerClass: 'class-in-header second-class'},
                    {label: 'Played', field: 'played', headerClass: 'class-in-header second-class'},
                    {label: 'Won', field: 'won', headerClass: 'class-in-header second-class'},
                    {label: 'Drawn', field: 'drawn', headerClass: 'class-in-header second-class'},
                    {label: 'Lost', field: 'lost', headerClass: 'class-in-header second-class'},
                    {label: 'GD', field: 'goals_difference', headerClass: 'class-in-header second-class'},
                ],
                rows: [],
                coefficients: [],
                sample: 0
            }
        },
        methods: {
            async fetchLeagueTable() {
                const response = await this.$axios.get(`/weeks/${this.week}`);
                this.rows = response.data.rows;
                if (this.rows.length <= 0 && this.week < 7) {
                    const res = await this.$axios.post(`/weeks`, {
                        week: this.week
                    });
                    this.rows = res.data.rows;
                }
                if(this.week > 3){
                    this.showPredictions();
                }
            },

            showPredictions() {
                const vm = this;
                vm.sample = 0;
                vm.coefficients = [];
                vm.rows.forEach(function (item) {
                    let team = item.team.name;
                    let ratio = parseInt(item.won * item.won);
                    vm.sample += ratio;
                    vm.coefficients.push({
                        key: Math.random(),
                        name: team,
                        ratio,
                    });
                })
            }
        },
        mounted() {
            this.fetchLeagueTable();
        },
        // watch: {
        //     week: function (newWeek) {
        //         if (newWeek > 3 && newWeek < 7) {
        //             this.showPredictions();
        //         }
        //     }
        // },

    }
</script>

