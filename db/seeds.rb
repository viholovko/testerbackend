puts 'Create role ...'
@role = Role.create name: "admin"
@role.save!
puts 'Role created ...'


puts 'Create admin ...'
User.create email: 'admin@gmail.com', password: 'secret', password_confirmation: 'secret', confirmed: true, role_id: @role.id
puts 'Admin created ...'

