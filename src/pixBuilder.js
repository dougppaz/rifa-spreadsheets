import { Pix } from 'faz-um-pix/lib'

export default async (pixKey, pixKeyOwnerName, pixKeyOwnerCity, ticketPrice, message) => {
  const pixArgs = [
    pixKey,
    pixKeyOwnerName,
    pixKeyOwnerCity,
    ticketPrice.toFixed(2),
    message.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  ]
  const pixURL = await Pix(...pixArgs)
  const pixQrCode = await Pix(...pixArgs, true)
  return { pixURL, pixQrCode }
}
