import segno

links = ["AB", "AC", "AD", "AE", 
        "BA", "BC", "BD", "BE", 
        "CA", "CB", "CD", "CE", 
        "DA", "DB", "DC", "DE", 
        "EA", "EB", "EC", "ED"]

for link in links:
    qrcode = segno.make_qr(f"http://pssiappka.pl/result/{link}")
    qrcode.save(f"./static/qr_codes/{link}.png", scale=10)
