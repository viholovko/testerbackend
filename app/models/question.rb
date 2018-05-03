class Question < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  field :question, type: String
  field :type, type: String, default: 'numeric'
  field :order, type: Integer, default: 0
  field :test_id, type: String

  def self.search_query(params)
    query_params = {}

    query_params[:id] = params[:id] if params[:id].present?
    query_params[:question] = %r{.*#{params[:title]}.*}i if params[:question].present?
    q.where(tests[:status].eq(params[:status]))              if params[:status].present?
    q.where(tests[:type].eq(params[:type]))                  if params[:type].present?

    sort_column = params[:sort_column] || :created_at
    sort_type = params[:sort_type] || :desc

    Question.where(query_params).order(sort_column => sort_type)
  end

end
