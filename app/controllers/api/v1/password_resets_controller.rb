class Api::V1::PasswordResetsController < Api::V1::BaseController

  skip_before_action :authenticate_user

  def create
    user = User.find_by email: params[:email]

    render json: { errors: ['user_not_found'] }, status: 404 and return unless user.present?

    user.send_password_reset
    render json: { message: 'password_reset_instructions_sent' }
  end

  def update
    user = User.find_by reset_password_token: params[:reset_password_token]

    render json: {errors: ['user_not_found']}, status: 404 and return unless user.present?

    if user.update_attributes password: params[:password], password_confirmation: params[:password_confirmation]
      render json: { message: 'password_successfully_restored' }
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

end
