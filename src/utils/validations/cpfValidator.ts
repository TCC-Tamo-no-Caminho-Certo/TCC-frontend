export default function CPFValidator(strCPF = ''): boolean {
  const a: string = strCPF.replace(/[^\w\s]/gi, '')
  let Soma = 0
  let Resto
  if (!a) return false
  if (a === '00000000000') return false
  for (let i = 1; i <= 9; i += 1) {
    Soma += parseInt(a.substring(i - 1, i)) * (11 - i)
  }
  Resto = (Soma * 10) % 11
  if (Resto === 10 || Resto === 11) Resto = 0
  if (Resto !== parseInt(a.substring(9, 10))) return false
  Soma = 0
  for (let i = 1; i <= 10; i += 1) {
    Soma += parseInt(a.substring(i - 1, i)) * (12 - i)
  }
  Resto = (Soma * 10) % 11
  if (Resto === 10 || Resto === 11) Resto = 0
  if (Resto !== parseInt(a.substring(10, 11))) return false
  return true
}
