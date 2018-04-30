class BulishMailer < ApplicationMailer

  def send_info_about_new_subscriber(user)
    @user = user
    mail to: ENV['MAIL_BULISH'],
         subject: 'New Subscriber'
  end

  def send_info_about_new_user(user)
    @user = user
    mail to: ENV['MAIL_BULISH'],
         subject: 'New Message'
  end

end
