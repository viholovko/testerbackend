class UserMailer < ApplicationMailer

  def confirmation_instructions(user)
    @user = user
    @url  = ENV['HOST'] + "/api/v1/users/confirm_email?t=#{@user.confirmation_token}"

    mail to: @user.email,
         subject: 'RealMoney confirmation instructions'
    end

  def send_email_user_seccessfully_created(user)
    @user = user
    mail to: @user.email,
         subject: 'RealMoney user created'
  end

  def password_reset(user)
    @user = user

    @url  = ENV['HOST'] + "/api/v1/password_resets/?reset_password_token=#{@user.reset_password_token}"
    mail to: @user.email,
         subject: 'RealMoney reset password instructions.'
  end

end
