<template>
  <div
    class="date-picker"
    @click.self="closeCalendar"
  >
    <div class="input-wrapper px-2">
      <input
        type="text"
        v-model="myDate"
        :placeholder="placeholder"
        class="outline-none !border-hidden"
        :readonly="readonly"
        @click="readonly ? toggleCalendar : undefined"
      />
      <base-button
        @click="toggleCalendar"
      >
        <template #icon>
          <CalendarIcon />
        </template>
      </base-button>
    </div>
    <div
      v-if="showCalendar"
      class="calendar"
      @click.stop
    >
      <div class="flex gap-x-4 items-center mb-6">
        <div>
          <label for="year">年份：</label>
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
        <!-- <div>
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
        </div> -->
        <base-button
          @click="changeCalendarType('month')"
        >
          {{ displayedMonth }}
        </base-button>
      </div>
      <div v-if="selectedType === 'month'" class="month-calendar">
        <div
          v-for="(month, idx) in months"
          :key="idx"
          @click="selectMonth(month.value)"
          :class="{ 'selected': month.value === selectedMonth, 'day': true }"
        >
          {{ month.text }}
        </div>
      </div>
      <div v-if="selectedType === 'date'" class="day-calendar">
        <div v-for="weekday in weekdays" :key="weekday" class="mb-4 font-black">{{ weekday }}</div>
        <span
          v-for="blank in firstDayOfMonth"
          :key="'blank-' + blank"
          class="blank-date day"
        ></span>
        <div
          v-for="day in calendarDays"
          :key="day"
          @click="selectDate(day)"
          :class="{ 'selected': day === selectedDay, 'day': true }"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent, onMounted, watch } from 'vue'
import BaseButton from '@/components/button/BaseButton.vue'
import CalendarIcon from '@/components/svg/CalendarIcon.vue'

export default defineComponent ({
  name: 'RocCustomDatePicker',
  components: {
    BaseButton,
    CalendarIcon,
  },
  props: {
    date: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '民國年/月/日',
    },
    splitter: {
      type: String,
      default: '/',
    },
    readonly: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['update:date'],
  setup (props, { emit }) {
    const showCalendar = ref(false)
    const selectedYear = ref(null)
    const selectedMonth = ref(null)
    const selectedDay = ref(null)
    const calendarDays = ref([])
    // NOTE: selectedType 要用來切換日期、月份等功能
    // date (default), month, year, decade
    const selectedType = ref('date')

    const weekdays = ["日", "一", "二", "三", "四", "五", "六"]
    const months = [
      {text: '一月', value: 1},
      {text: '二月', value: 2},
      {text: '三月', value: 3},
      {text: '四月', value: 4},
      {text: '五月', value: 5},
      {text: '六月', value: 6},
      {text: '七月', value: 7},
      {text: '八月', value: 8},
      {text: '九月', value: 9},
      {text: '十月', value: 10},
      {text: '十一月', value: 11},
      {text: '十二月', value: 12}
    ]

    // computed
    const myDate = computed({
      get: () => props.date,
      set: (newVal) => emit('update:date', newVal)
    })

    const displayedMonth = computed(() => {
      return months.find(month => month.value === selectedMonth.value)?.text || ''
    })

    const years = computed(() => {
      const currentYear = new Date().getFullYear() - 1911
      const range = 100
      return Array.from({ length: range }, (_, i) => currentYear - i)
    })

    const firstDayOfMonth = computed(() => {
      const year = selectedYear.value
      const month = selectedMonth.value
      if (!year || !month) return 0
      console.log('firstDayOfMonth:', new Date(year + 1911, month - 1, 1).getDay())
      // 這裡的 year 是民國年，所以要加上 1911
      return new Date(year + 1911, month - 1, 1).getDay()
    })

    // watch
    watch(() => myDate.value, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        console.log('enter watch:', newValue)
        const dateList = newValue.split(props.splitter)
        if (new Date(newValue).toString() === 'Invalid Date' || dateList.length !== 3) {
          setDefault()
          return
        }
        selectedYear.value = parseInt(dateList[0])
        selectedMonth.value = parseInt(dateList[1])
        selectedDay.value = parseInt(dateList[2])
      }
    })

    // methods
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

    const changeCalendarType = (type) => {
      selectedType.value = type
    }

    const selectMonth = (month) => {
      selectedMonth.value = month
      selectedType.value = 'date'
      selectedDay.value = null
      generateCalendar()
    }

    const selectDate = (day) => {
      console.log('day:', day)
      console.log('selectedYear.value:', selectedYear.value)
      console.log('selectedMonth.value:', selectedMonth.value)
      selectedDay.value = day
      myDate.value = `${selectedYear.value}/${selectedMonth.value}/${selectedDay.value}`
      console.log('myDate.value', myDate.value)
      showCalendar.value = false
    }

    const setDefault = () => {
      const today = new Date()
      // 預設給當月, 不選擇日期
      selectedYear.value = today.getFullYear() - 1911
      selectedMonth.value = today.getMonth() + 1
      selectedDay.value = null
    }

    // mounted
    onMounted(() => {
      if (props.date) {
        const dateList = props.date.split(props.splitter)
        selectedYear.value = parseInt(dateList[0]) - 1911
        selectedMonth.value = parseInt(dateList[1])
        selectedDay.value = parseInt(dateList[2])
      } else setDefault()
      setTimeout(() => {
        generateCalendar()
      }, 100)
    })

    return {
      changeCalendarType,
      displayedMonth,
      firstDayOfMonth,
      showCalendar,
      selectedYear,
      selectedMonth,
      selectedDay,
      calendarDays,
      months,
      years,
      toggleCalendar,
      closeCalendar,
      generateCalendar,
      selectDate,
      selectMonth,
      selectedType,
      weekdays,
      myDate
    }
  },
})
</script>

<style lang="scss" scoped>
.date-picker {
  position: relative;
}

.weekdays {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
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

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus {
    outline: none;
  }
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

.day-calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 10px;
}

.month-calendar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-top: 10px;
}

.day-calendar div.day, .month-calendar div.day {
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
}

.day-calendar div.selected, .month-calendar div.selected {
  color: white;
  background-color: #007bff;
}

.day-calendar div.day:hover, .month-calendar div.day:hover {
  background-color: #e0e0e0;
}
</style>
