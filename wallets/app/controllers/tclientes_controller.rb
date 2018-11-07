class TclientesController < ApplicationController
  before_action :set_tcliente, only: [:show, :edit, :update, :destroy]

  # GET /tclientes
  # GET /tclientes.json
  def index
    @tclientes = Tcliente.all
  end

  # GET /tclientes/1
  # GET /tclientes/1.json
  def show
  end

  # GET /tclientes/new
  def new
    @tcliente = Tcliente.new
  end

  # GET /tclientes/1/edit
  def edit
  end

  # POST /tclientes
  # POST /tclientes.json
  def create
    @tcliente = Tcliente.new(tcliente_params)

    respond_to do |format|
      if @tcliente.save
        format.html { redirect_to @tcliente, notice: 'Tcliente was successfully created.' }
        format.json { render :show, status: :created, location: @tcliente }
      else
        format.html { render :new }
        format.json { render json: @tcliente.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tclientes/1
  # PATCH/PUT /tclientes/1.json
  def update
    respond_to do |format|
      if @tcliente.update(tcliente_params)
        format.html { redirect_to @tcliente, notice: 'Tcliente was successfully updated.' }
        format.json { render :show, status: :ok, location: @tcliente }
      else
        format.html { render :edit }
        format.json { render json: @tcliente.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tclientes/1
  # DELETE /tclientes/1.json
  def destroy
    @tcliente.destroy
    respond_to do |format|
      format.html { redirect_to tclientes_url, notice: 'Tcliente was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tcliente
      @tcliente = Tcliente.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tcliente_params
      params.require(:tcliente).permit(:idcliente, :nombres, :apellidos, :direccion, :celular, :correo, :estado, :fecgrab, :usergrab)
    end
end
