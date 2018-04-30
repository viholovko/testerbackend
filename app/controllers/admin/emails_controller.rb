class Admin::EmailsController < Admin::BaseController

  before_action :find_email, only: %i[show update destroy]

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

  def update
    if @email.update_attributes email_params
      render json: { message: I18n.t('email.messages.success_upsert') }
    else
      render json: { errors: @email.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @email.destroy
    render json: {ok: true}
  end

  def show; end

  # related models actions

  private

  def find_email
    @email = Email.find params[:id]
  end

  def email_params
    params.permit %i[email name details origin]
  end

end
