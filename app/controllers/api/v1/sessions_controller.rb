class Api::V1::SessionsController < Api::V1::BaseController

  before_action :authenticate_user, only: :destroy

  def create
    user = User.find_by email: params[:email]

    if user&.authenticate params[:password]
      session = sign_in(user: user, push_token: params[:push_token], device_type: params[:device_type])
      render json: user.to_json.merge(session_token: session.token)
    else
      render json: {errors: ['wrong_email_password_combination']}, status: :unprocessable_entity
    end
  end

  def destroy
    sign_out
    head :no_content
  end

  def check
    if current_session.present?
      head :no_content
    else
      respond_with_errors
    end
  end

end
