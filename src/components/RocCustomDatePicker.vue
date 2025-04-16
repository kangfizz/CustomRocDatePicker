<template>
  <div
    class="date-picker"
    @click.self="closeCalendar"
  >
    <div class="input-wrapper px-2">
      <input
        type="text"
        v-model="minguoDate"
        placeholder="民國年/月/日"
        class="outline-none"
        readonly
        @click="toggleCalendar"
      />
      <button
        @click="toggleCalendar"
        class="icon-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24" fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-calendar"
        >
          <rect
            x="3" y="4"
            width="18" height="18"
            rx="2" ry="2"
          ></rect>
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
          ></line>
          <line
            x1="8"
            y1="2"
            x2="8"
            y2="6"
          ></line>
          <line
            x1="3"
            y1="10"
            x2="21"
            y2="10"
          ></line>
        </svg>
      </button>
    </div>
    <div
      v-if="showCalendar"
      class="calendar"
      @click.stop
    >
      <div class="flex column-gap-2 items-center">
        <div>
          <label for="year">民國年：</label>
          <select
            id="year"
            v-model="selectedYear"
            @change="generateCalendar"
          >
            <option
              v-for="year in years"
              :key="year"
              :value="year"
            >{{ year }}</option>
          </select>
        </div>
        <div>
          <label for="month">月份：</label>
          <select
            id="month"
            v-model="selectedMonth"
            @change="generateCalendar"
          >
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index + 1"
            >{{ month }}</option>
          </select>
        </div>
      </div>
      <div class="calendar-grid">
        <div
          v-for="day in calendarDays"
          :key="day"
          @click="selectDate(day)"
          :class="{ 'selected': day === selectedDay }"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup () {
    const showCalendar = ref(false)
    const selectedYear = ref(null)
    const selectedMonth = ref(null)
    const selectedDay = ref(null)
    const minguoDate = ref('')
    const calendarDays = ref([])

    const months = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ]

    const years = computed(() => {
      const currentYear = new Date().getFullYear() - 1911
      const range = 100
      return Array.from({ length: range }, (_, i) => currentYear - i)
    })

    const generateCalendar = () => {
      calendarDays.value = []
      if (selectedYear.value && selectedMonth.value) {
        const year = selectedYear.value + 1911
        const month = selectedMonth.value
        const daysInMonth = new Date(year, month, 0).getDate()
        calendarDays.value = Array.from({ length: daysInMonth }, (_, i) => i + 1)
      }
    }

    const toggleCalendar = () => {
      showCalendar.value = !showCalendar.value
    }

    const closeCalendar = () => {
      showCalendar.value = false
    }

    const selectDate = (day) => {
      selectedDay.value = day
      minguoDate.value = `${selectedYear.value}/${selectedMonth.value}/${selectedDay.value}`
      showCalendar.value = false
    }

    return {
      showCalendar,
      selectedYear,
      selectedMonth,
      selectedDay,
      minguoDate,
      calendarDays,
      months,
      years,
      toggleCalendar,
      closeCalendar,
      generateCalendar,
      selectDate,
    }
  },
}
</script>

<style>
.date-picker {
  position: relative;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  border: solid 1px #ccc;
  border-radius: 5px;
}

.input-wrapper input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.icon-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.icon-button svg {
  width: 20px;
  height: 20px;
  color: #333;
}

.calendar {
  position: absolute;
  z-index: 1000;
  padding: 10px;
  margin-top: 8px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 10px;
}

.calendar-grid div {
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-grid div.selected {
  color: white;
  background-color: #007bff;
}

.calendar-grid div:hover {
  background-color: #e0e0e0;
}
</style>
