class TcobradorsController < ApplicationController
  before_action :set_tcobrador, only: [:show, :edit, :update, :destroy]

  # GET /tcobradors
  # GET /tcobradors.json
  def index
    @tcobradors = Tcobrador.all
  end

  # GET /tcobradors/1
  # GET /tcobradors/1.json
  def show
  end

  # GET /tcobradors/new
  def new
    @tcobrador = Tcobrador.new
  end

  # GET /tcobradors/1/edit
  def edit
  end

  # POST /tcobradors
  # POST /tcobradors.json
  def create
    @tcobrador = Tcobrador.new(tcobrador_params)

    respond_to do |format|
      if @tcobrador.save
        format.html { redirect_to @tcobrador, notice: 'Tcobrador was successfully created.' }
        format.json { render :show, status: :created, location: @tcobrador }
      else
        format.html { render :new }
        format.json { render json: @tcobrador.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tcobradors/1
  # PATCH/PUT /tcobradors/1.json
  def update
    respond_to do |format|
      if @tcobrador.update(tcobrador_params)
        format.html { redirect_to @tcobrador, notice: 'Tcobrador was successfully updated.' }
        format.json { render :show, status: :ok, location: @tcobrador }
      else
        format.html { render :edit }
        format.json { render json: @tcobrador.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tcobradors/1
  # DELETE /tcobradors/1.json
  def destroy
    @tcobrador.destroy
    respond_to do |format|
      format.html { redirect_to tcobradors_url, notice: 'Tcobrador was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tcobrador
      @tcobrador = Tcobrador.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tcobrador_params
      params.require(:tcobrador).permit(:idcobrador, :clave, :correo, :celular, :direccion, :estado)
    end

end
