<template>
  <div
    class="date-picker"
  >
    <div :class="`input-wrapper px-2 ${needInput ? 'border border-solid rounded-[5px] border-[#ccc]' : ''}`" @click.stop>
      <input
        v-if="needInput"
        type="text"
        v-model="displayedDate"
        :placeholder="placeholder"
        class="outline-none !border-hidden"
        :readonly="readonly"
        @click="readonly ? toggleCalendar() : undefined"
      />
      <div>
        <base-button
          @click="toggleCalendar"
        >
          <template #icon>
            <CalendarIcon />
          </template>
        </base-button>
        <div
          v-if="showCalendar"
          v-click-outside="closeCalendar"
          id="customCalendar"
          class="calendar"
          @click.stop
        >
          <div v-if="selectedType === 'date'" class="flex gap-x-4 items-center mb-6">
            <div class="flex gap-x-2 items-center">
              <base-button @click="changeCalendar('minusYear')" :disabled="selectedYear === 1">
                <template #icon>
                  <ChevronLeftIcon />
                </template>
              </base-button>
              <base-button
                @click="changeCalendarType('year')"
              >
                <div class="whitespace-nowrap">{{ displayedYear }}</div>
              </base-button>
              <base-button @click="changeCalendar('plusYear')">
                <template #icon>
                  <ChevronRightIcon />
                </template>
              </base-button>
            </div>
            <div class="flex gap-x-2 items-center">
              <base-button @click="changeCalendar('minusMonth')" :disabled="selectedYear === 1 && selectedMonth === 1">
                <template #icon>
                  <ChevronLeftIcon />
                </template>
              </base-button>
              <base-button
                @click="changeCalendarType('month')"
              >
                <div class="whitespace-nowrap">{{ displayedMonth }}</div>
              </base-button>
              <base-button @click="changeCalendar('plusMonth')">
                <template #icon>
                  <ChevronRightIcon />
                </template>
              </base-button>
            </div>
          </div>
          <div v-if="selectedType === 'year'" class="flex flex-nowrap gap-x-2 items-center">
            <base-button :disabled="yearRangeIndex === 0" @click="yearRangeIndex--">
              <template #icon>
                <ChevronLeftIcon />
              </template>
            </base-button>
            <div class="year-calendar">
              <template v-for="(year, idx) in years">
                <div
                  v-if="year"
                  :key="idx"
                  @click="canClick('year', year) ? selectYear(year) : undefined"
                  :class="{ 'selected': year === selectedYear && canClick('year', year), 'item whitespace-nowrap min-w-[70px]': true, 'disabled': !canClick('year', year) }"
                >
                  {{ year }}
                </div>
              </template>
            </div>
            <base-button :disabled="yearRangeIndex === currentYearRangeIndex && !needFuture" @click="yearRangeIndex++">
              <template #icon>
                <ChevronRightIcon />
              </template>
            </base-button>
          </div>
          <div v-if="selectedType === 'month'" class="month-calendar">
            <div
              v-for="(month, idx) in months"
              :key="idx"
              @click="canClick('month', month.value) ? selectMonth(month.value) : undefined"
              :class="{ 
                'selected': month.value === selectedMonth && canClick('month', month.value), 'item whitespace-nowrap min-w-[70px]': true, 
                'disabled': !canClick('month', month.value)
              }"
            >
              {{ month.text }}
            </div>
          </div>
          <div>
            <div v-if="selectedType === 'date'" class="day-calendar">
              <div v-for="weekday in weekdays" :key="weekday" class="mb-4 font-black">{{ weekday }}</div>
              <span
                v-for="blank in firstDayOfMonth"
                :key="'blank-' + blank"
                class="blank-date item"
              ></span>
              <div
                v-for="day in calendarDays"
                :key="day"
                @click="canClick('date', day) ? selectDate(day) : undefined"
                :class="{ 'selected': checkIsSelectedDate(day) && canClick('date', day), 'item': true, 'disabled': !canClick('date', day) }"
              >
                {{ day }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, defineComponent, onMounted, onBeforeUnmount, watch } from 'vue'
import BaseButton from '@/components/button/BaseButton.vue'
import CalendarIcon from '@/components/svg/CalendarIcon.vue'
import ChevronLeftIcon from '@/components/svg/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/svg/ChevronRightIcon.vue'
import { fillZero, validateDate } from '@/utils/dateHelper.js'

export default defineComponent ({
  name: 'RocCustomDatePicker',
  components: {
    BaseButton,
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon
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
    // NOTE: 設定input readonly屬性, 如果為 true 的話, 變成點選後也會開啟日曆
    readonly: {
      type: Boolean,
      default: false,
    },
    // NOTE: 是否顯示輸入框 (false 則只有 icon button)
    needInput: {
      type: Boolean,
      default: true,
    },
    // NOTE: 是否可需要選擇未來的日期
    needFuture: {
      type: Boolean,
      default: false,
    },
    // NOTE: 是否自動轉換成 ROC 年格式
    // 例如：2023/10/01 會轉換成 112/10/01
    autoToRocFormat: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:date'],
  setup (props, { emit }) {

    // data
    const isInitial = ref(true) // 用來判斷是否是第一次進入
    const showCalendar = ref(false)
    const selectedYear = ref(null)
    const selectedMonth = ref(null)
    const selectedDay = ref(null)
    const calendarDays = ref([])
    // NOTE: selectedType 要用來切換日期、月份等功能
    // date (default), month, year, decade
    const selectedType = ref('date')
    const yearRangeIndex = ref(null)
    const currentYearRangeIndex = ref(Math.floor((new Date().getFullYear() - 1911) / 15))

    const displayedDate = ref(null)

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

    const displayedYear = computed(() => {
      return parseInt(selectedYear.value) <= 0 ? `民國前 ${Math.abs(selectedYear.value) + 1} 年` : `民國 ${selectedYear.value} 年`
    })

    const years = computed(() => {
      const listFirstYear = yearRangeIndex.value * 15

      const range = 15
      return Array.from({ length: range }, (_, i) => listFirstYear + i)
    })

    const firstDayOfMonth = computed(() => {
      const year = selectedYear.value
      const month = selectedMonth.value
      if (!year || !month) return 0
      // 這裡的 year 是民國年，所以要加上 1911
      return new Date(year + 1911, month - 1, 1).getDay()
    })

    // watch
    watch(() => displayedDate.value, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        const isValidDate = new Date(newValue).toString() !== 'Invalid Date'
        const dateList = newValue.split(props.splitter)
        if (!isValidDate || dateList.length !== 3) {
          setDefaultCalendar()
          return
        }
        selectedYear.value = parseInt(dateList[0])
        selectedMonth.value = parseInt(dateList[1])
        selectedDay.value = parseInt(dateList[2])
        // 更改 myDate 的值
        if (isValidDate && validateDate(selectedYear.value + 1911, selectedMonth.value, selectedDay.value)) {
          myDate.value = props.autoToRocFormat ? `${selectedYear.value + 1911}/${fillZero(selectedMonth.value)}/${fillZero(selectedDay.value)}` : newValue
        } else {
          myDate.value = ''
        }
      }
    })

    // methods
    const generateDayCalendar = () => {
      // 生成 該年份 + 該月份 的日期
      calendarDays.value = []
      if (selectedYear.value && selectedMonth.value) {
        const year = selectedYear.value + 1911
        const month = selectedMonth.value
        const daysInMonth = new Date(year, month, 0).getDate()
        calendarDays.value = Array.from({ length: daysInMonth }, (_, i) => i + 1)
      }
    }

    const changeCalendar = (type) => {
      if (type === 'minusYear') {
        selectedYear.value -= 1
      } else if (type === 'plusYear') {
        selectedYear.value += 1
      } else if (type === 'minusMonth') {
        if (selectedMonth.value > 1) selectedMonth.value -= 1
        else {
          selectedMonth.value = 12
          selectedYear.value -= 1
        }
      } else if (type === 'plusMonth') {
        if (selectedMonth.value < 12) selectedMonth.value += 1
        else {
          selectedMonth.value = 1
          selectedYear.value += 1
        }
      }
      generateDayCalendar()
    }

    const checkIsSelectedDate = (day) => {
      const checkedDate = `${selectedYear.value}${props.splitter}${fillZero(selectedMonth.value)}${props.splitter}${fillZero(day)}`
      return checkedDate === displayedDate.value
    }

    const toggleCalendar = () => {
      const dateList = displayedDate.value?.split(props.splitter)
      if (!dateList || dateList.length !== 3 || !validateDate(parseInt(dateList[0]) + 1911, parseInt(dateList[1]), parseInt(dateList[2]))) {
        // 如果日期不正確，則設定當前為預設日歷
        setDefaultCalendar()
      } else {
        setCalendar(displayedDate.value)
        // 自動校正顯示日期
        displayedDate.value = `${selectedYear.value}${props.splitter}${fillZero(selectedMonth.value)}${props.splitter}${fillZero(selectedDay.value)}`
      }
      setTimeout(() => {
        if (!showCalendar.value) showCalendar.value = true
        else closeCalendar()
      }, 50)
    }

    const closeCalendar = () => {
      selectedType.value = 'date'
      showCalendar.value = false
    }

    const changeCalendarType = (type) => {
      selectedType.value = type
    }

    const selectYear = (year) => {
      selectedYear.value = year
      selectedType.value = 'month'
      selectedMonth.value = null
    }

    const selectMonth = (month) => {
      selectedMonth.value = month
      selectedType.value = 'date'
      selectedDay.value = null
      generateDayCalendar()
    }

    const selectDate = (day) => {
      selectedDay.value = day
      displayedDate.value = [selectedYear.value, fillZero(selectedMonth.value), fillZero(selectedDay.value)].join(props.splitter)
      showCalendar.value = false
    }

    const setDefaultCalendar = () => {
      const today = new Date()
      // 預設給當月, 不選擇日期
      selectedYear.value = today.getFullYear() - 1911
      selectedMonth.value = today.getMonth() + 1
      selectedDay.value = null
      yearRangeIndex.value = Math.floor(selectedYear.value / 15)
      setTimeout(() => {
        generateDayCalendar()
      }, 100)
    }

    const setCalendar = (dateString, needFormat = false) => {
      
      // 設定基礎年月日與生成日曆
      const dateList = dateString.split(props.splitter)
      selectedYear.value = needFormat ? parseInt(dateList[0]) - 1911 : parseInt(dateList[0])
      selectedMonth.value = parseInt(dateList[1])
      selectedDay.value = parseInt(dateList[2])
      yearRangeIndex.value = Math.floor(selectedYear.value / 15)
      setTimeout(() => {
        generateDayCalendar()
      }, 100)
    }

    /**
     * 依據 props.needFuture 的值 (當 false 時)，決定該日期是否可以被點擊
     * @param {String} type - 'year', 'month', 'date'
     * @param {Number} value - 當前的值
     * @returns {Boolean} - 是否可以點擊
     */
    const canClick = (type, value) => {
      if (props.needFuture) return true

      // 當不需要未來的日期時，才會進行判斷
      if (type === 'year') {
        return value > new Date().getFullYear() - 1911 ? false : true
      } else if (type === 'month') {
        return selectedYear.value >= new Date().getFullYear() - 1911 && value > new Date().getMonth() + 1 ? false : true
      } else if (type === 'date') {
        return new Date(selectedYear.value + 1911, selectedMonth.value - 1, value) > new Date() ? false : true
      }
    }

    // mounted
    onMounted(() => {
      if (props.date) {
        setCalendar(props.date, props.autoToRocFormat)
        displayedDate.value = `${selectedYear.value}${props.splitter}${fillZero(selectedMonth.value)}${props.splitter}${fillZero(selectedDay.value)}`
        isInitial.value = false
      } else {
        setDefaultCalendar()
      }

    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeCalendar)
    })

    return {
      changeCalendar,
      changeCalendarType,
      checkIsSelectedDate,
      displayedDate,
      displayedMonth,
      displayedYear,
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
      generateDayCalendar,
      selectDate,
      selectMonth,
      selectYear,
      selectedType,
      weekdays,
      myDate,
      yearRangeIndex,
      currentYearRangeIndex,
      canClick
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
  margin-left: -100px;
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

.month-calendar, .year-calendar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-top: 10px;
}

.day-calendar div.item, .month-calendar div.item, .year-calendar div.item {
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
}

.day-calendar div.selected, .month-calendar div.selected, .year-calendar div.selected {
  color: white;
  background-color: #007bff;
}

.day-calendar div.item:hover, .month-calendar div.item:hover, .year-calendar div.item:hover {
  background-color: #e0e0e0;
}

</style>
