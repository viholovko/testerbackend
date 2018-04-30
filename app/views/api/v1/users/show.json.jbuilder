json.user do
  json.id @user.id.to_s
  json.first_name @user.first_name
  json.last_name @user.last_name
  json.title @user.title
  json.email @user.email
  json.avatar @user.avatar
  json.confirmed @user.confirmed
  json.created_at @user.created_at.try :strftime, '%d %b %Y at %H:%M'
  json.updated_at @user.updated_at.try :strftime, '%d %b %Y at %H:%M'
end