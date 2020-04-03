package com.app.projettic.service.mapper;


import com.app.projettic.domain.*;
import com.app.projettic.service.dto.UserExtraDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserExtra} and its DTO {@link UserExtraDTO}.
 */
@Mapper(componentModel = "spring", uses = {GroupeMapper.class, EvaluationMapper.class, UserMapper.class})
public interface UserExtraMapper extends EntityMapper<UserExtraDTO, UserExtra> {

    @Mapping(source = "groupe.id", target = "groupeId")
    @Mapping(source = "evaluation.id", target = "evaluationId")
    @Mapping(source = "user.id", target = "userId")
    UserExtraDTO toDto(UserExtra userExtra);

    @Mapping(source = "groupeId", target = "groupe")
    @Mapping(source = "evaluationId", target = "evaluation")
    @Mapping(source = "userId", target = "user")
    UserExtra toEntity(UserExtraDTO userExtraDTO);

    default UserExtra fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserExtra userExtra = new UserExtra();
        userExtra.setId(id);
        return userExtra;
    }
}
