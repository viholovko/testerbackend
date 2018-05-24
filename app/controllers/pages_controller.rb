class PagesController < ApplicationController

  skip_before_action :authenticate_user

  def index
    render layout: 'test'
  end

  def admin
    render layout: 'admin'
  end

  def test
    render layout: 'test'
  end

end
