class Admin::SessionsController < Admin::BaseController

  skip_before_action :authenticate_user, only: %i[create check]
  skip_before_action :only_admins, only: %i[create check]

  def create
    @user = User.find_by email: params[:email]

    if @user&.authenticate params[:password]
      sign_in user: @user
      head :no_content
    else
      render json: {errors: ['Wrong email/password combination.']}, status: :unprocessable_entity
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
