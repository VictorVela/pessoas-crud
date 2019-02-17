package com.andre.app.domain.dto;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class PeopleNewDto {

	@NotEmpty(message = "Campo nome é obrigatório")
	private String name;
	
	@NotEmpty(message = "Campo email é obrigatório")
	@Email(message = "Campo não está no formato de e-mail")
	private String email;
	
//	@NotEmpty(message = "Campo Data de Nascimento é obrigatório")
	private LocalDate dateBird;

	
	public PeopleNewDto() {
		super();
	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDateBird() {
		return dateBird;
	}

	public void setDateBird(LocalDate dateBird) {
		this.dateBird = dateBird;
	}


	@Override
	public String toString() {
		return "PeopleNewDto [name=" + name + ", email=" + email + ", dateBird=" + dateBird + "]";
	}
	
	
	
	
}