require 'json'

str_dats = File.open('starorbits.speck','r')
orbits = []
orbit = {:steps => [], :name => ''}

i=0
in_data = false
str_dats.each do |star_dat|
  unless ['}',"\n",'#','d','t','m'].include? star_dat[0]
    data = star_dat.strip.split(/ +/)
    
    if data.include?('text')
      name = []
      in_name = false
      data.each do |dat|
        if dat == 'text'
          in_name = true
        elsif in_name
          name << dat
        end
      end
      orbit[:name] = name.join(' ')
    elsif in_data
      if data.include?('#')
        orbit[:steps] << [data[0].to_f, data[1].to_f, data[2].to_f]
      end
    end
  end
  puts star_dat if star_dat[0] == '#'
  if star_dat.include? '{'
    in_data = true
    puts 'inning data'
  elsif star_dat.include? '}'
    in_data = false
    orbits << orbit
    orbit = {:steps => [], :name => ''}
  end
end

#puts maxes.inspect
#puts mins.inspect

File.open('../starorbits.json','w'){ |file| file.write orbits.to_json }

