package com.hepta.funcionarios.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import com.hepta.funcionarios.entity.Setor;

public class SetorDAO{
	
	public void save(Setor setor) throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(setor);
			em.getTransaction().commit();
		}catch(Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		}
		finally {
			em.close();
		}
	}
	
	
	public Setor update(Setor setor) throws Exception{
		EntityManager em = HibernateUtil.getEntityManager();
		Setor setorAtualizado = null;
		try {
			em.getTransaction().begin();
			setorAtualizado = em.merge(setor);
			em.getTransaction().commit();
		}catch(Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		}
		finally {
			em.close();
		}
		return setorAtualizado;
	}

	public Setor find(Integer id) throws Exception{
		EntityManager em = HibernateUtil.getEntityManager();
		Setor setor = null;
		try {
			em.getTransaction().begin();
			setor = em.find(Setor.class, id);
		}catch(Exception e) {
			throw new Exception(e);
		}finally {
			em.close();
		}
		return setor;
	}

	public List<Setor> getAll() throws Exception {
		EntityManager em = HibernateUtil.getEntityManager();
		List<Setor> listaSetor = new ArrayList<Setor>();
		try {
			em.getTransaction().begin();
			listaSetor = em
					.createQuery("from Setor")
					.getResultList();
		}catch(Exception e) {
			throw new Exception(e);
		}finally{
			em.close();
		}
		return listaSetor;
	}
	
	public void delete(Integer id) throws Exception{
		EntityManager em = HibernateUtil.getEntityManager();
		try {
			em.getTransaction().begin();
			em.remove(
					em.find(Setor.class, id));
		}catch(Exception e) {
			em.getTransaction().rollback();
			throw new Exception(e);
		}finally {
			em.close();
		}
		
	}
}
