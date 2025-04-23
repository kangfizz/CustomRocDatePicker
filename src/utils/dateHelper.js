// 紀錄與時間相關的通用函式

/**
 * 檢查日期是否為有效日期
 * 基於 Date 物件的驗證 (例: 2022-02-30 => 2022-03-02, 但此不該通過)
 * @param {number} year - 西元年
 * @param {number} month - 月 (1-12)
 * @param {number} day - 日 (1-31)
 * @returns {boolean}
 */
export const validateDate = (year, month, day) => {
  month = month - 1
  const d = new Date(year, month, day)
  return (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day)
}

export const fillZero = (num) => ('0' + num).slice(-2)