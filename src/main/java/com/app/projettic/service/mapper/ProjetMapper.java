package com.app.projettic.service.mapper;


import com.app.projettic.domain.*;
import com.app.projettic.service.dto.ProjetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Projet} and its DTO {@link ProjetDTO}.
 */
@Mapper(componentModel = "spring", uses = {GroupeMapper.class, UserMapper.class})
public interface ProjetMapper extends EntityMapper<ProjetDTO, Projet> {

    @Mapping(source = "groupe.id", target = "groupeId")
    @Mapping(source = "userExtra.id", target = "userExtraId")
    ProjetDTO toDto(Projet projet);

    @Mapping(source = "groupeId", target = "groupe")
    @Mapping(source = "userExtraId", target = "userExtra")
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "removeDocument", ignore = true)
    Projet toEntity(ProjetDTO projetDTO);

    default Projet fromId(Long id) {
        if (id == null) {
            return null;
        }
        Projet projet = new Projet();
        projet.setId(id);
        return projet;
    }
}
