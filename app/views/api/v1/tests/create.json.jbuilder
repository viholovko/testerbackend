json.test do
  json.id @test.id.to_s
  json.title @test.title
  json.description @test.description
  json.report_count 0
  json.url "http://31.131.20.79:84/test/#/tests/#{@test.id.to_s}"
  json.created_at @test.created_at
  json.questions Question.where(test_id: @test.id)&.each do |question|
    json.id question.id.to_s
    json.question question.question
    json.type question.type
    json.order question.order
    json.additional question.additional
    json.options Option.where(question_id: question.id)&.each do |option|
      json.id option.id.to_s
      json.text option.text
      json.rate option.rate
    end
  end
end
