class Api::V1::QuestionsController < Api::V1::BaseController

  skip_before_action :authenticate_user
  before_action :find_question, only: %i[show update destroy]

  def create
    @question = Question.new question_params
    if @question.save
      params[:options].each do |option|
        option = Option.new(text: option, question: @question)
        option.save
      end
      @options = Option.where(question_id: @question.id)

    else
      render json: {errors: @test.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @question.update_attributes question_params
      render json: { message: 'Question has been successfully saved' }
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @question.destroy
      Option.where(question_id: @question.id.to_s).delete_all
      render json: { message: 'Question has been successfully deleted' }
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @options = Option.where(question_id: @question.id)
  end

  private

  def find_question
    @question = Question.find params[:id]
  end

  def question_params
    allowed_params = params.permit :id, :question, :type, :order, :test_id

    allowed_params
  end

end
