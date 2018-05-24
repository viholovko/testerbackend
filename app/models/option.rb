class Option < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  # include Mongoid::Paperclip

  field :text, type: String
  field :rate, type: Float
  field :question_id, type: String

  def self.search_query(params)
    query_params = {}

    query_params[:id] = params[:id] if params[:id].present?
    query_params[:title] = %r{.*#{params[:title]}.*}i if params[:title].present?

    sort_column = params[:sort_column] || :created_at
    sort_type = params[:sort_type] || :desc

    Option.where(query_params).order(sort_column => sort_type)
  end

  def to_json_date
    result = {
      id: id.to_s,
      text: text,
      rate: rate,
      question_id: question_id
    }

    result
  end

end
