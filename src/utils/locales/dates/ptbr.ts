interface TodayObject {
  year: number
  month: number
  day: number
}

export default {
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],

  weekDays: [
    {
      name: 'Domingo',
      short: 'D',
      isWeekend: true
    },
    {
      name: 'Segunda',
      short: 'S'
    },
    {
      name: 'Terça',
      short: 'T'
    },
    {
      name: 'Quarta',
      short: 'Q'
    },
    {
      name: 'Quinta',
      short: 'Q'
    },
    {
      name: 'Sexta',
      short: 'S'
    },
    {
      name: 'Sábado',
      short: 'S',
      isWeekend: true
    }
  ],

  weekStartingIndex: 0,

  getToday(gregorainTodayObject: TodayObject): TodayObject {
    return gregorainTodayObject
  },

  toNativeDate(date: TodayObject): Date {
    return new Date(date.year, date.month - 1, date.day)
  },

  getMonthLength(date: TodayObject): number {
    return new Date(date.year, date.month, 0).getDate()
  },

  transformDigit(digit: string | number): string | number {
    return digit
  },

  nextMonth: 'Próximo mês',
  previousMonth: 'Mês anterior',
  openMonthSelector: 'Selecionar mês',
  openYearSelector: 'Selecionar ano',
  closeMonthSelector: 'Fechar seleção de mês',
  closeYearSelector: 'Fechar seleção de ano',
  defaultPlaceholder: 'Data de nascimento',
  from: 'de',
  to: 'até',
  digitSeparator: ',',
  yearLetterSkip: 0,
  isRtl: false
}
