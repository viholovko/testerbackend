json.test do
  json.id @test.id.to_s
  json.title @test.title
  json.created_at @test.created_at.try :strftime, '%d %b %Y at %H:%M'
  json.questions Question.where(test_id: @test.id.to_s)&.each do |question|
    json.id question.id.to_s
    json.question question.question
    json.type question.type
    json.order question.order
    json.options Option.where(question_id: question.id)&.each do |option|
      json.id option.id.to_s
      json.text option.text
    end
  end
end