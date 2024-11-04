package world.moducare.domain.region.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QregionCode is a Querydsl query type for regionCode
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QregionCode extends EntityPathBase<regionCode> {

    private static final long serialVersionUID = -776953970L;

    public static final QregionCode regionCode = new QregionCode("regionCode");

    public final StringPath code = createString("code");

    public final StringPath gugun = createString("gugun");

    public final StringPath sido = createString("sido");

    public QregionCode(String variable) {
        super(regionCode.class, forVariable(variable));
    }

    public QregionCode(Path<? extends regionCode> path) {
        super(path.getType(), path.getMetadata());
    }

    public QregionCode(PathMetadata metadata) {
        super(regionCode.class, metadata);
    }

}

