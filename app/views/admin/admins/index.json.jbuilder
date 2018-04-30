json.admins @admins.each do |admin|
  json.id admin.id.to_s
  json.first_name admin.first_name
  json.email admin.email
  json.created_at admin.created_at.try :strftime, '%d %b %Y at %H:%M'
end
json.count @count