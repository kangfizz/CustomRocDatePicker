<template>
  <div class="date-picker" ref="datePickerRef">
    <input
      type="text"
      readonly
      :value="formattedDate"
      @click="toggleCalendar"
      class="date-input"
    />
    <div v-if="showCalendar" class="calendar" @click.stop>
      <div class="calendar-header">
        <span @click="currentView = 'year'">{{ currentYear }}</span>
        <span @click="currentView = 'month'">{{ currentMonthLabel }}</span>
      </div>
      <div v-if="currentView === 'year'" class="year-grid">
        <div
          v-for="year in years"
          :key="year"
          @click="selectYear(year)"
          class="year-item"
        >
          {{ year }}
        </div>
      </div>
      <div v-if="currentView === 'month'" class="month-grid">
        <div
          v-for="(month, index) in months"
          :key="month"
          @click="selectMonth(index)"
          class="month-item"
        >
          {{ month }}
        </div>
      </div>
      <div v-if="currentView === 'date'" class="date-grid">
        <div class="weekdays">
          <span v-for="weekday in weekdays" :key="weekday">{{ weekday }}</span>
        </div>
        <div class="dates">
          <span
            v-for="blank in firstDayOfMonth"
            :key="'blank-' + blank"
            class="blank-date"
          ></span>
          <span
            v-for="date in daysInMonth"
            :key="'date-' + date"
            @click="selectDate(date)"
            class="date-item"
          >
            {{ date }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

export default {
  setup () {
    const today = new Date()
    const showCalendar = ref(false)
    const currentYear = ref(today.getFullYear())
    const currentMonth = ref(today.getMonth())
    const selectedDate = ref(today)
    const currentView = ref("date")

    const weekdays = ["日", "一", "二", "三", "四", "五", "六"]
    const months = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ]

    const formattedDate = computed(() => {
      if (!selectedDate.value) return ""
      const year = selectedDate.value.getFullYear()
      const month = selectedDate.value.getMonth() + 1
      const date = selectedDate.value.getDate()
      return `${year}/${month.toString().padStart(2, "0")}/${date
        .toString()
        .padStart(2, "0")}`
    })

    const years = computed(() => {
      const startYear = 1900
      const endYear = 2100
      return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
    })

    const daysInMonth = computed(() => {
      const year = currentYear.value
      const month = currentMonth.value
      return new Date(year, month + 1, 0).getDate()
    })

    const firstDayOfMonth = computed(() => {
      const year = currentYear.value
      const month = currentMonth.value
      return new Date(year, month, 1).getDay()
    })

    const toggleCalendar = () => {
      showCalendar.value = !showCalendar.value
      currentView.value = "date"
    }

    const selectYear = (year) => {
      currentYear.value = year
      currentView.value = "month"
    }

    const selectMonth = (month) => {
      currentMonth.value = month
      currentView.value = "date"
    }

    const selectDate = (date) => {
      selectedDate.value = new Date(
        currentYear.value,
        currentMonth.value,
        date
      )
      showCalendar.value = false
    }

    const handleClickOutside = (event) => {
      if (!datePickerRef.value.contains(event.target)) {
        showCalendar.value = false
      }
    }

    const datePickerRef = ref(null)

    onMounted(() => {
      document.addEventListener("click", handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside)
    })

    return {
      showCalendar,
      formattedDate,
      currentYear,
      currentMonth,
      currentView,
      weekdays,
      months,
      years,
      daysInMonth,
      firstDayOfMonth,
      toggleCalendar,
      selectYear,
      selectMonth,
      selectDate,
      datePickerRef,
    }
  },
}
</script>

<style scoped>
.date-picker {
  position: relative;
  display: inline-block;
}

.date-input {
  padding: 8px;
  width: 200px;
  font-size: 16px;
  cursor: pointer;
}

.calendar {
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 10;
  padding: 10px;
  width: 280px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.year-grid,
.month-grid,
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.weekdays {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.date-item,
.year-item,
.month-item {
  padding: 5px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 3px;
  cursor: pointer;
}

.date-item:hover,
.year-item:hover,
.month-item:hover {
  background: #e0e0e0;
}

.blank-date {
  visibility: hidden;
}
</style>
