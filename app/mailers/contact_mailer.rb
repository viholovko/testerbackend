class ContactMailer < ApplicationMailer

  def send_response(contact)
    @contact = contact
    mail to: @contact.email,
         subject: 'RealMoney'
    end

end
