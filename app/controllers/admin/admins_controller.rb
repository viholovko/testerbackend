class Admin::AdminsController < Admin::BaseController

  before_action :find_admin, only: %i[show update destroy]

  def index
    page = params[:page].to_i
    page = 1 if page < 1
    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    @count = User.search_query(params, true).count
    @admins = User.search_query(params, true)
                  .offset((page - 1) * per_page)
                  .limit(per_page)
  end

  def create
    @admin = User.new admin_params.merge(role: 'admin')

    if @admin.save
      render json: { message: 'Admin has been successfully saved' }
    else
      render json: {errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @admin.update_attributes admin_params
      render json: { message: 'Admin has been successfully saved' }
    else
      render json: { errors: @admin.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @admin.destroy
    head :no_content
  end

  def show; end

  private

  def find_admin
    @admin = User.find params[:id]
  end

  def admin_params
    params.require(:admin).permit %i[name email password password_confirmation]
  end

end
