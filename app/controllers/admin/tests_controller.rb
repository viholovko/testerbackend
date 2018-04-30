class Admin::TestsController < Admin::BaseController

  before_action :find_test, only: %i[show update destroy]

  def index
    page = params[:page].to_i
    page = 1 if page < 1
    per_page = params[:per_page].to_i
    per_page = 10 if per_page < 1

    @count = Test.search_query(params).count
    @tests = Test.search_query(params).offset((page - 1) * per_page).limit(per_page)
  end

  def create
    @test = Test.new test_params
    if @test.save
      render json: { message: 'Test has been successfully saved' }
    else
      render json: {errors: @test.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @test.update_attributes test_params
      render json: { message: 'Test has been successfully saved' }
    else
      render json: { errors: @test.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @test.destroy
      render json: { message: 'Test has been successfully deleted' }
    else
      render json: { errors: @test.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show; end

  private

  def find_test
    @test = Test.find params[:id]
  end

  def test_params
    allowed_params = params.require(:test).permit :id, :title, :status

    allowed_params
  end

end
