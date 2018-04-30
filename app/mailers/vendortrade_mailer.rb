class VendortradeMailer < ApplicationMailer

  def send_info_about_new_subscriber(user)
    @user = user
    mail to: ENV['MAIL_VENDORTRADE'],
         subject: 'New Subscriber'
  end

  def send_info_about_new_user(user)
    @user = user
    mail to: ENV['MAIL_VENDORTRADE'],
         subject: 'Added new user'
  end

end
