class Test::TestsController < Test::BaseController

  skip_before_action :authenticate_user, only: [:show]
  before_action :find_test, only: %i[show update destroy]


  def create
    @test = Test.new test_params
    if @test.save
      render json: { message: 'Test has been successfully saved' }
    else
      render json: {errors: @test.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
  end

  private

  def find_test
    @test = Test.find params[:id]
  end

  def test_params
    allowed_params = params.require(:test).permit :id, :title, :status

    allowed_params
  end

end
