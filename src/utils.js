export const verboseTicketNumbers = (ticketNumbers) => {
  if (ticketNumbers.length === 1) {
    return ticketNumbers[0]
  }
  return [ticketNumbers.slice(0, -1).join(', '), ticketNumbers.slice(-1)].join(' e ')
}
