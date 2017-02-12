from PIL import Image
import csv

im = Image.open('earthmap360x180.jpg')
pix = im.load()

#if the image isn't already 360x180 for nice and easy 1px=1deg mapping
#x_inc = 3600/im.size[0]
#y_inc = 1800/im.size[1]

out_data = [['lon','lat','col','hex']]


for y in range (0,180):
	for x in range(0,360):
		#get the rgb values for this pixel
		r = float(pix[x,y][0])
		g = float(pix[x,y][1])
		b = float(pix[x,y][2])
		
		#hex value color of each pixel rounded to bin values (3 bins, 27 colors) for a more detailed palette 
		hr = str(hex(int(round((r)/127.5) * 127.5))).replace('0x','')
		hg = str(hex(int(round((g)/127.5) * 127.5))).replace('0x','')
		hb = str(hex(int(round((b)/127.5) * 127.5))).replace('0x','')
		hx = hr + hg + hb
			
			
		#rough Blue, White, Green, Brown color bins based on rgb values
		if r > 200 and g > 200 and b > 200:
			color = 'w' #white
		elif abs(r-g) < 20 and (r+g) > 400 and b > 150:
			color = 'br' #brown/tan
		elif b > g and b > r:
			color = 'b' #blue
		elif g > b and g > r:
			color = 'g' #green
		elif r > b and r > g:
			color = 'gr' #grey/green
		else:
			color = 'w' #white

		row = [(x-180),-1*(y-90),color,hx]
		out_data.append(row)
		
outfile = open('earthmap.csv', 'wb')
writer = csv.writer(outfile)
writer.writerows(out_data)