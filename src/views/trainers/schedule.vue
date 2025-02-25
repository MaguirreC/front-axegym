<template>
    <form class="p-4">
    <div class="row g-6">
      <div class="col-md-6 mb-3">
        <label for="trainer" class="form-label">Select a Trainer <span style="color:red;">*</span></label>
        <el-select v-model="form.trainerId" placeholder="Select a trainer" class="form-control form-control-lg" id="trainer" style="width: 100%">
          <el-option v-for="trainer in trainers" :key="trainer.id" :label="trainer.name" :value="trainer.id" />
        </el-select>
        <div class="invalid-feedback">Trainer is required.</div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="shift" class="form-label">Select a Shift <span style="color:red;">*</span></label>
        <el-select v-model="form.shift" placeholder="Select a shift" class="form-control form-control-lg" id="shift" style="width: 100%">
          <el-option v-for="shift in shifts" :key="shift" :label="shift" :value="shift" />
        </el-select>
        <div class="invalid-feedback">Shift is required.</div>
      </div>
    </div>
    <div class="row g-6 mb-3">
      <div class="col-md-12 mb-3">
        <label for="localDate" class="form-label">Select a Date <span style="color:red;">*</span></label>
        <el-date-picker v-model="form.localDate" type="date" placeholder="Select a date" class="form-control form-control-lg" id="localDate" style="width: 100%" />
        <div class="invalid-feedback">Date is required.</div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-3" @click="onSubmit">Submit</button>
  </form>
    <!-- Datepicker para seleccionar la fecha -->
    <div class="mt-4">
    <label for="scheduleDate" class="form-label">Select a date</label>
    <input type="date" v-model="selectedDate" class="form-control" id="scheduleDate" @input="fetchSchedules">
  </div>

  <!-- Lista de turnos -->
  <div class="mt-4">
    <h5>Shifts for {{ selectedDate }}</h5>
    <ul v-if="schedules.length > 0" class="list-group">
      <li v-for="schedule in schedules" :key="schedule.id" class="list-group-item">
        <strong>Trainer:</strong> {{ schedule.trainerName }} |
        <strong>Shift:</strong> {{ schedule.shift === 'MORNING' ? 'Morning' : 'Evening' }}
      </li>
    </ul>
    <p v-else class="text-muted">No shifts found for this date.</p>
  </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
 
const apiBaseUrl = import.meta.env.VITE_API_URL;
const selectedTrainer = ref(null);
const selectedShift = ref(null);
const selectedDate = ref(null);

const trainers = ref([])
const schedules =ref([])

const form=reactive({
    trainerId:'',
    localDate:'',
    shift:''
})

const shifts = ['MORNING', 'EVENING'];


const fetchTrainers = async()=>{


    try{
        console.log('trayendo trainers')
        const response = await axios.get(`${apiBaseUrl}/trainers`);
        trainers.value = response.data;
    }catch(error){
        console.log('error bringin trainers ')

    }
    
    
}
const fetchSchedules = async()=>{
  if(!selectedDate.value) return;

  try{
    const formattedDate= selectedDate.value.split('T')[0];
    console.log('trayendo schedules',formattedDate)

    const response = await axios.get(`${apiBaseUrl}/schedule/date?date=${formattedDate}`);
    schedules.value = response.data;
  }catch(error){
    console.log('error trayendo los schedules')

  }
}
const onSubmit = async()=>{
  event.preventDefault();
  console.log('boton funcionando')
  newTurn()
}
const newTurn = async()=>{
    const url = `${apiBaseUrl}/schedule`
    const dataForm={
        trainerId: form.trainerId,
        shift:form.shift,
        localDate:form.localDate
    }

    try{
        axios.post(url,dataForm)
        .then(function(response){
            console.log(response);
            resetForm()
            ElMessage({
                    message: 'turn successfully added    .',
                    type: 'success',
                })
                
          })
          .catch(function(error){
            console.log(error)
          })
    }catch(error){
        console.log('error schedule')

    }
}
const resetForm = () => {
  form.trainerId= '';
  form.shift= ''; 
  form.localDate = '';
};
onMounted(()=>{
    fetchTrainers()
})
</script>
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.col-md-6,
.col-md-12 {
  flex: 0 0 100%;
  max-width: 100%;
}
.col-md-6 {
  flex: 0 0 calc(50% - 8px); /* Ajuste para dar espacio entre columnas */
}
.el-select,
.el-date-picker {
  width: 100% !important;
}
</style>