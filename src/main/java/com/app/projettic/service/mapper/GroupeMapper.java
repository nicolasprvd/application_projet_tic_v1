package com.app.projettic.service.mapper;


import com.app.projettic.domain.*;
import com.app.projettic.service.dto.GroupeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Groupe} and its DTO {@link GroupeDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProjetMapper.class, UserExtraMapper.class})
public interface GroupeMapper extends EntityMapper<GroupeDTO, Groupe> {

    @Mapping(source = "projet.id", target = "projetId")
    @Mapping(source = "userExtra.id", target = "userExtraId")
    GroupeDTO toDto(Groupe groupe);

    @Mapping(source = "projetId", target = "projet")
    @Mapping(source = "userExtraId", target = "userExtra")
    Groupe toEntity(GroupeDTO groupeDTO);

    default Groupe fromId(Long id) {
        if (id == null) {
            return null;
        }
        Groupe groupe = new Groupe();
        groupe.setId(id);
        return groupe;
    }
}
