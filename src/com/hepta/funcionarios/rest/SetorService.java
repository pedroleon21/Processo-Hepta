package com.hepta.funcionarios.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.hepta.funcionarios.entity.Setor;
import com.hepta.funcionarios.persistence.SetorDAO;

@Path("/setor")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class SetorService {
	
	@Context
	private HttpServletRequest request;

	@Context
	private HttpServletResponse response;
	
	private SetorDAO dao;
	
	
	public SetorService() {
		dao = new SetorDAO();
	}
	
	protected void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	@GET
	public Response getSetores() {
		List<Setor> listaSetor = new ArrayList<Setor>();
		try {
			listaSetor = dao.getAll();
		}catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return Response.status(Status.OK).entity(listaSetor).build();
	}
	
	@POST
	public Response createSetor(Setor setor) {
		try {
			dao.save(setor);
		}catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return Response.status(Status.CREATED).build();
	}
	
	@Path("/{id}")
	@PUT
	public Response UpdateSetor(@PathParam("id") Integer id,Setor setor) {
		try {
			Setor setorEncontrado = dao.find(id);
			if(Objects.isNull(setorEncontrado)) {
				return Response.status(Status.NOT_FOUND).build();
			}else {
				dao.update(setor);
			}
		}catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return Response.status(Status.OK).build();
	}
	
	@Path("/{id}")
	@DELETE
	public Response remove(@PathParam("id") Integer id) {
		try {
			if(Objects.isNull(dao.find(id))) {
				return Response.status(Status.NOT_FOUND).build();
			}else {
				dao.delete(id);
			}
		}catch(Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
		return Response.status(Status.OK).build();
	}
	
	
}
