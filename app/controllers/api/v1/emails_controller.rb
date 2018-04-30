class Api::V1::EmailsController < Api::V1::BaseController

  skip_before_action :authenticate_user
  after_action :cors_set_access_control_headers
  before_action :find_email, only: %i[show]

  def index
    page = params[:page].to_i
    page = 1 if page < 1
    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    @count = Email.search_query(params).count
    @emails = Email.search_query(params)
                   .offset((page - 1) * per_page)
                   .limit(per_page)
  end

  def create
    email = Email.new email_params
    if email.save
      render json: {message: I18n.t('email_created')}, status: 200
    else
      render json: {errors: email.errors.full_messages}, status: 422
    end
  end

  # related models actions

  private

  def find_email
    @email = Email.find params[:id]
  end

  def email_params
    params.permit %i[email name origin]
  end

end
