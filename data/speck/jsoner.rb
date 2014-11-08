require 'json'




def rgb_color bv_color, luminosity
  temp = 4600 * ( (1/((0.92*bv_color) + 1.7)) + (1/((0.92*bv_color) + 0.62)) )
  
  puts temp
  
  if temp <= 66 
      red = 255
  else
      red = temp - 60
      red = 329.698727446 * (red ** -0.1332047592)
      if red < 0 
        red = 0
      elsif red > 255 
        red = 255
      end
  end

  if temp <= 66 
      green = temp
      green = (99.4708025861 * Math.log(green)) - 161.1195681661
      if green < 0 
        green = 0
      elsif green > 255 
        green = 255
      end
  else
      green = temp - 60
      green = 288.1221695283 * (green ** -0.0755148492)
      if green < 0 
        green = 0
      elsif green > 255 
        green = 255
      end
  end

  if temp >= 66 
      blue = 255
  else
      if temp <= 19 
          blue = 0
      else
          blue = temp - 10
          blue = (138.5177312231 * Math.log(blue)) - 305.0447927307
          if blue < 0 
            blue = 0
          elsif blue > 255 
            blue = 255
          end
      end
  end
  
  [red, green, blue]
  
end



str_dats = File.open('stars.speck','r')
stars = []
#maxes = [0,0,0]
#mins = [0,0,0]


i=0
str_dats.each do |star_dat|
  unless ['#','d','t'].include? star_dat[0]
    data = star_dat.split(/ +/)
    
    star = {
      name: data.last.strip,
      pos: [
        data[1].to_f, data[2].to_f, data[3].to_f
      ],
      color: rgb_color(data[4].to_f, data[5].to_f)
    }
    
    #[0,1,2].each do |iga|
    #  stariga = star[:pos][iga]
    #  maxes[iga] = stariga if stariga > maxes[iga]
    #  mins[iga] = stariga if stariga < mins[iga]
    #end
    
    stars << star
    
    i+=1
    puts star.inspect
    return if i == 10
  end
end

#puts maxes.inspect
#puts mins.inspect

str_jsons = File.open('stars.json','w')
str_jsons

