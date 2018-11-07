class TcreditosController < ApplicationController
  before_action :set_tcredito, only: [:show, :edit, :update, :destroy]

  # GET /tcreditos
  # GET /tcreditos.json
  def index
    @tcreditos = Tcredito.all
  end

  # GET /tcreditos/1
  # GET /tcreditos/1.json
  def show
  end

  # GET /tcreditos/new
  def new
    @tcredito = Tcredito.new
  end

  # GET /tcreditos/1/edit
  def edit
  end

  # POST /tcreditos
  # POST /tcreditos.json
  def create
    @tcredito = Tcredito.new(tcredito_params)

    respond_to do |format|
      if @tcredito.save
        format.html { redirect_to @tcredito, notice: 'Tcredito was successfully created.' }
        format.json { render :show, status: :created, location: @tcredito }
      else
        format.html { render :new }
        format.json { render json: @tcredito.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tcreditos/1
  # PATCH/PUT /tcreditos/1.json
  def update
    respond_to do |format|
      if @tcredito.update(tcredito_params)
        format.html { redirect_to @tcredito, notice: 'Tcredito was successfully updated.' }
        format.json { render :show, status: :ok, location: @tcredito }
      else
        format.html { render :edit }
        format.json { render json: @tcredito.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tcreditos/1
  # DELETE /tcreditos/1.json
  def destroy
    @tcredito.destroy
    respond_to do |format|
      format.html { redirect_to tcreditos_url, notice: 'Tcredito was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tcredito
      @tcredito = Tcredito.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tcredito_params
      params.require(:tcredito).permit(:idcredito, :valor, :descripcion, :estado)
    end
end
