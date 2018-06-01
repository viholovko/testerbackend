class Test::TestsController < Test::BaseController

  skip_before_action :authenticate_user, only: [:show, :create]
  before_action :find_test, only: %i[show]


  def create
    answers = []
    answers_date = []
    params[:answers].each { |k, v|  answers.push(v)}
    test_id = ''
    answers.each do |answer|
      question = Question.find_by(id: answer['question_id'])
      answer_date = []
      test_id = question.test_id

      case question.type
        when "numeric"
          result = {
            id: '',
            text: answer['value'],
            rate: question.order,
            question_id: question.id.to_s
          }
          answer_date.push(result)
        when "check"
          options = answer['value'].split(",")

          options.each do |option|
            option_date = Option.find_by(id: option)
            answer_date.push(option_date.to_json_date)
          end
        when "order"
          options = answer['value'].split(",")
          options.each do |option|
            option_date = Option.find_by(id: option)
            answer_date.push(option_date.to_json_date)
          end
        when "radio"
          options = answer['value'].split(",")
          options.each do |option|
            option_date = Option.find_by(id: option)
            answer_date.push(option_date.to_json_date)
          end
        else
          puts('It is not a string')
      end

      result = {
        question: question.to_json,
        answers: answer_date
      }
      answers_date.push(result)
    end

    @record = Record.create(test_id: test_id, record: answers_date)
    if @record.save
      render json: { message: 'Your results has been successfully saved' }
    else
      render json: {errors: @record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
  end

  private

  def find_test
    @test = Test.find params[:id]
  end

  def test_params
    allowed_params = params[:answers]
    allowed_params
  end

end
